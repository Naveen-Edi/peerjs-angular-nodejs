import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/service/call.service';

@Component({
	selector: 'app-videocall',
	templateUrl: './videocall.component.html',
	styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {

	constructor(private callService: CallService) { }

	ngOnInit(): void {
		this.videocall('id','user_id');
	}

	videocall(id,user_id){
		this.callService.calling(id,user_id);
	}

	videoclose(){
		console.log("stop it");
		this.callService.stop();
		location.reload();
	}

}
