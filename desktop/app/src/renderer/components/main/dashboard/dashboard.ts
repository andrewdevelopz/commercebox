/**
 *  This script file will handle all javascript needed for the dashboard
 *  section of the application. We seperate componenets script with
 *  namespaces to keep things organized.
 */

namespace Dashboard {
    const { getHTML } = window.helpers;
    const grid: HTMLElement = document.querySelector('#grid') as HTMLElement;

    getHTML('main/dashboard/card/card.html')
        .then((x: any) => {
            console.log(x);
            grid.insertAdjacentHTML('afterbegin', x);
        })
        .catch((e: any) => console.log(e));

    // loadComponent('#includes', 'main/dashboard/card/card.html', false, false);
}
