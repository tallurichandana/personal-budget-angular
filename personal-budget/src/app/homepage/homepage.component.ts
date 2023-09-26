import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

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
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#fd6b90',
                '#36aeb8',
                '#36ae78',
                '#36ae18',
            ],
        }
    ],
    labels: []
  };




  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get<{ myBudget: { title: never; budget: never }[] }>('http://localhost:3000/budget')
      .subscribe((res) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
      });
  }

createChart(){
  var ctx = document.getElementById('myChart') as HTMLCanvasElement;
  var myPieChart = new Chart(ctx,{
      type:'pie',
      data:this.dataSource,
  });
}

}
