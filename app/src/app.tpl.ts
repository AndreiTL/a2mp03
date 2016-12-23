export const template: string = `
<div class="appcontainer">
    <!--<weather [amounttowns]="this.amountTowns" [location]="this.getLocation$ | async"></weather>     -->
    <!--<googlemap [location]="this.getLocation$ | async" [zoom]="this.zoom"></googlemap>-->
    <weather [amounttowns]="this.amountTowns"></weather>     
    <googlemap [zoom]="this.zoom"></googlemap>
</div>
`;