module.exports = {
    env: 'development',
    clusters: ['https://nightly.capillary.in/arya/api/v1/',
    'https://eu.intouch.capillarytech.com/arya/api/v1/',
    'https://intouch.capillary.co.in/arya/api/v1/',
    'https://apac2.intouch.capillarytech.com/arya/api/v1/',
    // 'http://192.168.33.103/arya/api/v1/',
    'https://intouch.capillarytech.cn.com/arya/api/v1/'
    ],
    ionic_app_id: 'dd15de0e',
    authorization_ionic_api_key: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMWM1YmY1Mi0zZjlhLTQ1NDAtYmJkNy1mN2Y4MTcxNmY4YTAifQ.mzyiY_DWFDZOOogDOjeRkZQd8ZGc75FPn0o3M6-RKYg',
    profile: 'dev_profile',
    raygunApiKey: 'test',
    allowedApps: ["MD" , "aiRA", "CI"],
    allowedCharts: ['bar', 'area', 'scorecard', 'line', 'table'],
    allowedDimension: ['event_user', 'event_zone_till'],
    allowedInnerDimension: {
        event_user: ['loyalty_type', 'slab_name', 'region', 'gender'],
        event_zone_till: ['store_name', 'zone_name']
    },
    firebaseApiKey: 'key=AIzaSyC3_H6xeSK2-iX7w-PVVES3FBVAcXV-rac'
};
