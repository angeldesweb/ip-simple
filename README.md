#  Ip simple tool [![Generic badge](https://img.shields.io/badge/status-in_progress-yellow.svg)](https://shields.io/)

> Ipv4 scope finder, netmask to prefix converter, and ipv4 and netmask validations

##  Installation

- Install the module with your package manager

```shell
	npm i ip-simple-tool
```

##  Usage

```javascript
import { ipv4Network } from 'ip-simple-tool';

const network = { 
	address: '10.20.30.40', 
	netmask: '255.255.255.0' 
}

//Make a handler first
const myNetwork = ipv4Network(network)

//Get the network scope
myNetwork.getScope()
/*  OUTPUT
{
	network: string,
	boradcast: string,
	hosts: number,
	prefix: number,
	utilHosts: number
}*/
```

## License

> **MIT** License


