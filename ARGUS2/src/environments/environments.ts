// const SERVERIP: string = 'http://dashboardptg.vida-nyu.org:7890';
// const SERVERIP: string = 'http://172.24.113.198:7890';
const SERVERIP: string = 'https://argus-api.hsrn.nyu.edu';
// const SERVERIP: string = process.env["PTG_URL"];

export const environment = {
    
    staticPath: `${SERVERIP}/recordings/static`,
    recordingsPath: `${SERVERIP}/recordings`,
    rootPath: `${SERVERIP}`
    
}

