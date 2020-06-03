import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'replaceId' })
export class ReplaceId implements PipeTransform {
    transform(value: number, property: String, arr: any[]): string {
        if (arr == undefined) return;
        let i = arr.find(item => item.id == value)
        return i['' + property];
    }
}

@Pipe({ name: 'replaceBoolean' })
export class ReplaceBoolean implements PipeTransform {
    transform(value: boolean, property: String, arr: any[]): string {
        if (arr == undefined) return;
        let i = arr.find(item => item.id == value)
        return i['' + property];
    }
}