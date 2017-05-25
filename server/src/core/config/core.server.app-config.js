const config = {
	name: 'PCAARRD KM Communities',
	host: 'localhost',
	port: (process.env.NODE_ENV == 'production')? 80 : 3000,
	env: process.env.NODE_ENV || 'development'
};

export default config;