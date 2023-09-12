import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pinLatin'
})
export class PinLatinPipe implements PipeTransform {

  transform(value: string): string {
    let str="";
    let str1="";
    let flag=false;
    for(let i=0;i<value.length;i++){
      if(value[i]=='a' || value[i]=='e' || value[i]=='i' || value[i]=='o' || value[i]=='u' || value[i]=='A' || value[i]=='E' || value[i]=='I' || value[i]=='U' || value[i]=='O'){
        flag=true;
        str+=value[i];
      }
      else{
        if(flag==false){
          str1+=value[i];
        }
        else{
          str+=value[i];
        }
      }
    }
    str+=str1;
    str+="ay";
    return str;
  }

}
