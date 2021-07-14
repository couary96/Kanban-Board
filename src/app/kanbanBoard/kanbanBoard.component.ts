import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[] = [];
  stagesNames: string[] = [];
  stagesTasks: any[] = [];

  ngOnInit() {
    this.tasks = [
      { name: 'task 0', stage: 0 },
      { name: 'task 1', stage: 0 },
      { name: 'task 2', stage: 0 },
      { name: 'task 3', stage: 0 },
      { name: 'task 4', stage: 1 },
      { name: 'task 5', stage: 1 },
      { name: 'task 6', stage: 1 },
      { name: 'task 7', stage: 2 },
      { name: 'task 8', stage: 2 },
      { name: 'task 9', stage: 3 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name: any) => {
    return name.split(' ').join('-');
  }

  validateTask(task: any){
    return task.length < 1 ? true : false;
  }

  addTask(taskName: string, taskStage: number){
    const task = {name: taskName, stage: taskStage};
    this.tasks.push(task);
    this.stagesTasks[taskStage].push(task);
  }

  moveStageTask(taskName: string, taskStage: number, position: string){
    const newPosition = position === 'back' ? taskStage-1 : taskStage+1;
    this.tasks.forEach((task, index) => {
      if(task.name === taskName){ 
        this.tasks[index].stage = newPosition;
      }
    });
    const task = {name: taskName, stage: newPosition};
    let taskTemp = this.tasks.filter(res => res.stage === newPosition);
    let i = taskTemp.findIndex(resp => resp.name === taskName);
    this.stagesTasks[newPosition].splice(i, 0, task);
    this.deleteTask(taskName, taskStage);
  }

  deleteTask(taskName: string, taskStage: number){
    this.stagesTasks[taskStage] = this.stagesTasks[taskStage].filter(resp => resp.name !== taskName);
  }
}

interface Task {
  name: string;
  stage: number;
}