declare const VERSION;
export const version = VERSION;
export const printVersion = () => {
    console.log(
        `%cPowered By%c Imposium%c v${VERSION}%c https://imposium.com`,
        'text-transform: uppercase; padding: 5px 0px 5px 5px; background-color: black; color: white;',
        'text-transform: uppercase; padding: 5px 0px 5px 0px; background-color: black; color: #a1b83a;',
        'padding: 5px 5px 5px 0px; background-color: black; color: white;',
        'padding: 5px 5px 5px 0px;'
    );
};
