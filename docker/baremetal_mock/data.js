const uuid = require('uuid/v4');

const randomProperties = () => {
  const possibilities = [
    {
      memory_mb: "536",
      cpu_arch: "x86_64",
      local_gb: "1000",
      cpus: "16",
      capabilities: "iscsi_boot:true"
    },
    {
      memory_mb: "65536",
      cpu_arch: "x86_64",
      local_gb: "557",
      cpus: "32",
      capabilities: "cpu_hugepages:true,cpu_txt:true,cpu_vt:true,cpu_aes:true,cpu_hugepages_1g:true"
    },
    {
      memory_mb: "18236",
      cpu_arch: "x86_64",
      cpus: "24",
      capabilities: "iscsi_boot:true"
    },
  ];

  const randomIndex = Math.floor(possibilities.length * Math.random());
  return possibilities[randomIndex];
};

const constructNode = (n = 1) => {
  const node = {
    uuid: uuid(),
    last_error: null,
    properties: randomProperties()
  };

  if (n > 1) {
    return [node].concat(constructNode(n - 1));
  }
  return node;
};

const data = {
  node_list: {
    nodes: constructNode(8)
  },
  node: constructNode()
};

module.exports = data;
