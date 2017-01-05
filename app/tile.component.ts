import { Component, Input } from '@angular/core';
import { OneDriveService } from './one-drive.service';

@Component({
    selector: 'od-tile',
    template: `
    <div class="item folder" (click)="onTileClicked(tile)">
        <img *ngIf="tile.thumbnails && tile.thumbnails.length > 0" [src]="tile.thumbnails[0].c200x150_Crop.url" />
        <div class="nameplate">{{tile.name}}</div>
        <span>Tile Component</span>
    </div>
    `
})
export class TileComponent {
    @Input()
    tile: any;
}