import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF5733',
          '#FF33A8',
          '#33FF57',
          '#337DFF',
          '#33E2FF',
          '#FF338B',
          '#A833FF',
          '#33FFB5'
        ],
      }
    ],
    labels: []
  };

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {

    this.dataService.getBudgetData().subscribe((res) => {

      const data = res.myBudget.map((item) => item.budget);
      const labels = res.myBudget.map((item) => item.title);

      this.dataSource.datasets[0].data = data;
      this.dataSource.labels = labels;

      this.createChart();
      this.createPieChart();
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  createPieChart() {
    const data = this.dataSource.datasets[0].data;
    const labels = this.dataSource.labels;
    const backgroundColor = this.dataSource.datasets[0].backgroundColor;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#d3-pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(backgroundColor);

    const pie = d3.pie<number>().value((d) => d);

    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', (d, i) => color(i));

    arc.append('text')
      .attr('transform', (d) => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d, i) => labels[i]);
  }
}
