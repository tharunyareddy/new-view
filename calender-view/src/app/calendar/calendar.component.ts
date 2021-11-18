import { Component, OnInit } from '@angular/core';
import {
  format,
  isSameMonth,
  startOfMonth,
  subDays,
  startOfWeek,
  lastDayOfMonth,
  addDays,
  lastDayOfWeek,
  isSameWeek,
  differenceInDays,
  getDay,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
} from 'date-fns';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentDate = format(new Date(), 'MM/dd/yyyy');
  month: any[] = [];
  week: any[];
  monthDate: any = new Date();
  weekDate: any = new Date();
  selectButton: string = 'month';
  panelOpenState = false;
  tasks: any = [
    {
      taskName: 'Task A',
      startDate: new Date(2021, 10, 18),
      endDate: new Date(2021, 10, 19),
    },
    {
      taskName: 'Task AB',
      startDate: new Date(2021, 10, 18),
      endDate: new Date(2021, 11, 26),
    },
    {
      taskName: 'Task ABC',
      startDate: new Date(2021, 10, 15),
      endDate: new Date(2021, 10, 17),
    },
    {
      taskName: 'Task B',
      startDate: new Date(2021, 10, 12),
      endDate: new Date(2021, 11, 28),
    },
    {
      taskName: 'Task C',
      startDate: new Date(2021, 11, 13),
      endDate: new Date(2021, 11, 21),
    },
    {
      taskName: 'Task D',
      startDate: new Date(2021, 9, 3),
      endDate: new Date(2021, 9, 25),
    },
  ];

  currentWeekTasks: any = [];

  currentMonthTasks: any = [];

  constructor(private _calendarService: CalendarService) {}

  getWeekData = (date) => {
    this.week = this._calendarService.takeWeek(date)();
  };

  getMonthData = (date) => {
    let monthData = [];
    this._calendarService
      .takeMonth(date)()
      .forEach((eachWeek) =>
        eachWeek.forEach((eachDay) => {
          if (isSameMonth(eachDay, date)) {
            monthData.push(eachDay);
          }
        })
      );
    this.month = monthData;
  };

  ngOnInit(): void {
    this.getWeekData(this.weekDate);
    this.getMonthData(this.monthDate);

    this.currentMonthTasks = this.tasks.filter((eachTask) =>
      isSameMonth(eachTask.startDate, this.monthDate)
    );

    this.currentWeekTasks = this.tasks.filter((eachTask) =>
      isSameWeek(eachTask.startDate, this.weekDate)
    );
  }

  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.selectButton = 'month';
    } else {
      this.selectButton = 'week';
    }
  };

  onClickBack = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.getMonthData(this.monthDate);

    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek, 1);
    this.getWeekData(this.weekDate);

    this.currentMonthTasks = this.tasks.filter((eachTask) =>
      isSameMonth(eachTask.startDate, this.monthDate)
    );

    this.currentWeekTasks = this.tasks.filter((eachTask) =>
      isSameWeek(eachTask.startDate, this.weekDate)
    );
  };

  onClickNext = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.getMonthData(this.monthDate);

    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.getWeekData(this.weekDate);

    this.currentMonthTasks = this.tasks.filter((eachTask) =>
      isSameMonth(eachTask.startDate, this.monthDate)
    );

    this.currentWeekTasks = this.tasks.filter((eachTask) =>
      isSameWeek(eachTask.startDate, this.weekDate)
    );
  };

  formatDate = (date: any) => {
    return format(date, 'MM/dd/yyyy');
  };

  monthLeftSpace = (start: Date) => {
    let days = start.getDate() - 1;
    let margin = days * 3.2 + 'rem';
    return margin;
  };

  weekLeftSpace = (start: Date) => {
    let days = getDay(start);
    let margin = days * 13.6 + 0.3 + 'rem';
    return margin;
  };

  monthWidth = (start: Date, end: Date) => {
    let diff:any;
    let check = isSameMonth(start, end);
    let width: any;
    if (check) {
      diff =  differenceInDays(end, start);
      width = (diff + 1) * 3.2 + 'rem';
      return width;
    }else{
      let result = eachMonthOfInterval({start,end}).length;
      let firstDay = startOfMonth(end)
      console.log(result);
      diff =  differenceInDays(firstDay,end);
      width = (diff) * 3.2 + 'rem';
      return width;
    }
  };

  weekWidth = (start: Date, end: Date) => {
    let diff:any;
    let check = isSameWeek(end, start);
    let width: any;
    if (check) {
      diff = differenceInDays(end, start);
      width = (diff + 1) * 13.6 + 'rem';
      return width;
     }//else{
    //   diff = differenceInDays(end, start);
    //   width = (diff + 1) * 13.6 + 'rem';
    //   return width;
    // }

    // var result = eachWeekOfInterval({
    //   start: new Date(2014, 9, 6),
    //   end: new Date(2014, 10, 23),
    // });

    // console.log(result);
  };
}
