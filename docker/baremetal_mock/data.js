const uuid = require('uuid/v4');

const memoized = {
  uuid: []
};

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

const memoizedUUID = (n = 1) => {
  if (!memoized.uuid[n - 1]) {
    memoized.uuid[n - 1] = uuid();
  }

  return memoized.uuid[n - 1];
};

const constructNode = (n = 1, projectId, uuid) => {
  const node = {
    uuid: uuid || memoizedUUID(n),
    last_error: null,
    properties: Object.assign({ project_owner_id: projectId }, randomProperties())
  };

  if (n > 1) {
    return [node].concat(constructNode(n - 1));
  }
  return node;
};

const getNode = (id, projectId) => {
  return constructNode(1, projectId, id);
};

const createData = (projectId) => {
  return {
    node_list: {
      nodes: constructNode(8, projectId)
    },
    node: constructNode(1, projectId),
    getNode: (id) => getNode(id, projectId)
  };
};

module.exports = createData;
