import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ip-block',
  templateUrl: './ip-block.component.html',
  styleUrls: ['./ip-block.component.scss']
})
export class IpBlockComponent implements OnInit {

	constructor(private route: ActivatedRoute,
	private router: Router) { }

	ngOnInit() {
	}

}
