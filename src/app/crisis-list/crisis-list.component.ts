import { Component, OnInit } from "@angular/core";

interface Person {
  age: number;
}

interface Musician extends Person {
  instrument: string;
}

@Component({
  selector: "app-crisis-list",
  templateUrl: "./crisis-list.component.html",
  styleUrls: ["./crisis-list.component.css"],
})
export class CrisisListComponent implements OnInit {
  user: Musician = {
    age: 17,
    instrument: "guitar",
  };

  constructor() {}

  ngOnInit(): void {
    const newUser = {
      age: 12,
      instrument: "guitar",
    };

    this.user = newUser;
    console.log(this.user);
  }
}
