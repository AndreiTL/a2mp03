export const template: string = `
<div class="appcontainer">
    <googlemap [options]="this.getLocation | async"></googlemap>
    <weather [amounttowns]="this.amountTowns"></weather>     
</div>
`;