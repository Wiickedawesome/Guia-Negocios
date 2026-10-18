/**
 * Shared GA4 traffic-chart renderer used by the admin dashboard ("Traffic
 * Overview") and the Analytics page ("Traffic Volume"), so both surfaces show
 * the same chart instead of two different hand-rolled ones.
 *
 * Chart.js is intentionally NOT an npm dependency: both pages load the same
 * pinned UMD build from the CDN before this module runs, and we read it off
 * `window`. If that script fails to load, the chart area says so rather than
 * staying silently blank.
 */

export interface TrafficPoint {
  /** GA4 date dimension, formatted YYYYMMDD. */
  date: string;
  users: string;
}

interface ChartInstance {
  destroy(): void;
}

interface ChartConstructor {
  new (canvas: HTMLCanvasElement, config: unknown): ChartInstance;
  getChart(canvas: HTMLCanvasElement): ChartInstance | undefined;
}

interface AreaFillContext {
  chart: {
    ctx: CanvasRenderingContext2D;
    chartArea?: { top: number; bottom: number };
  };
}

const ACCENT = '#0284c7'; // sky-600

function getChartLib(): ChartConstructor | undefined {
  return (window as unknown as { Chart?: ChartConstructor }).Chart;
}

function formatGa4Date(ga4Date: string): string {
  if (ga4Date.length !== 8) return ga4Date;
  const date = new Date(`${ga4Date.slice(0, 4)}-${ga4Date.slice(4, 6)}-${ga4Date.slice(6, 8)}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return ga4Date;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function buildChartConfig(timeSeries: TrafficPoint[]) {
  const labels = timeSeries.map(point => formatGa4Date(point.date));
  const values = timeSeries.map(point => parseInt(point.users || '0', 10));

  return {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Active Users',
        data: values,
        borderColor: ACCENT,
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        backgroundColor: (context: AreaFillContext): string | CanvasGradient => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return 'rgba(2, 132, 199, 0.12)'; // first pass, before layout
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(2, 132, 199, 0.28)');
          gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
          return gradient;
        },
        // A dot per day is visual noise on the 90/365-day ranges, so only the
        // short ranges get markers (hover still shows the value).
        pointRadius: timeSeries.length > 60 ? 0 : 2.5,
        pointHoverRadius: 4,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: ACCENT,
        pointBorderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { displayColors: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { precision: 0 } },
        x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } }
      }
    }
  };
}

function destroyChartsIn(container: HTMLElement): void {
  const ChartLib = getChartLib();
  if (!ChartLib) return;
  container.querySelectorAll('canvas').forEach(canvas => ChartLib.getChart(canvas)?.destroy());
}

/**
 * Replaces the container's content with an explanatory message (used when the
 * chart library is missing or GA4 returned no rows). Any chart that was in the
 * container is destroyed first.
 */
export function clearTrafficChart(container: HTMLElement, message: string): void {
  destroyChartsIn(container);

  const wrapper = document.createElement('div');
  wrapper.className = 'h-full w-full flex items-center justify-center p-4';
  const text = document.createElement('p');
  text.className = 'text-sm text-slate-400 text-center';
  text.textContent = message; // textContent: callers may pass dynamic messages
  wrapper.appendChild(text);

  container.replaceChildren(wrapper);
}

/**
 * Renders (or re-renders) the GA4 active-users chart in `container`. Safe to
 * call repeatedly — any chart already in the container is destroyed first, so
 * switching date ranges cannot stack charts.
 */
export function renderTrafficChart(container: HTMLElement, timeSeries: TrafficPoint[]): void {
  const ChartLib = getChartLib();
  if (!ChartLib) {
    clearTrafficChart(container, 'Chart library failed to load.');
    return;
  }
  if (timeSeries.length === 0) {
    clearTrafficChart(container, 'No daily traffic data recorded in this period.');
    return;
  }

  destroyChartsIn(container);
  container.innerHTML = '<canvas></canvas>';
  const canvas = container.querySelector('canvas');
  if (!canvas) return;

  new ChartLib(canvas, buildChartConfig(timeSeries));
}
