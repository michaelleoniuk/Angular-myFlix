
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  /**
   * Selector for the Director component.
   * @member {string}
   */
  selector: 'app-director',

  /**
   * Template URL for the Director component.
   * @member {string}
   */
  templateUrl: './director.component.html',

  /**
   * Stylesheet URL for the Director component.
   * @member {string}
   */
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  /**
   * Constructor for the Director component.
   * @constructor
   * @param {MAT_DIALOG_DATA} data - Data injected into the component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Director: any}) { }

  /**
   * Lifecycle hook called after component initialization.
   * @function
   */
  ngOnInit(): void {
  }
}
