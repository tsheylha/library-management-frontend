import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, PieChartComponent } from '@swimlane/ngx-charts';
import { AreaChartComponent } from '@swimlane/ngx-charts';
import { LineChartComponent } from '@swimlane/ngx-charts'; 

@NgModule({
  imports: [
    CommonModule, // Import CommonModule if needed
    NgxChartsModule, 
  ],
  exports: [
    NgxChartsModule, 
    AreaChartComponent, 
    LineChartComponent ,
    PieChartComponent
  ]
})
export class SharedModule {}
