// const SERVERIP: string = 'http://dashboardptg.vida-nyu.org:7890';
// const SERVERIP: string = 'http://192.168.50.223:7890';
const SERVERIP: string = process.env["PTG_URL"];

export const environment = {
    
    staticPath: `${SERVERIP}/recordings/static`,
    recordingsPath: `${SERVERIP}/recordings`,
    rootPath: `${SERVERIP}`
    
}

