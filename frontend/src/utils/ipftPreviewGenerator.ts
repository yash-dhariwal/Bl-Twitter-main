function ipfsPreviewGenerator(ipfsLink: string) {
  // Split the IPFS link by '/'
  const parts = ipfsLink.split("/");

  // Extract the hash part
  const hash = parts[parts.length - 2];

  // Construct the browser-supported URL
  return `https://${hash}.ipfs.nftstorage.link/${parts[parts.length - 1]}`;
}

export default ipfsPreviewGenerator;
