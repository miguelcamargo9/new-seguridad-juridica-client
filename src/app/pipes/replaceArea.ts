import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceArea' })
export class ReplaceArea implements PipeTransform {
    transform(area: number): String {
        if (area == undefined) return;
        const hectarea = Math.floor(area / 10000);
        const metros = (area % 10000).toFixed(2);
        // let h = int(area / 10000)
        return hectarea + 'Ha ' + metros + ' m2';
    }
}