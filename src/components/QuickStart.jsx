import { Card, Typography } from "antd";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
// import ContractResolver from "./Contract/ContractResolver";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
// import Transfer from "./Wallet/components/Transfer";
import NativeBalance from "./NativeBalance";
import Address from "./Address/Address";
import Blockie from "./Blockie";
// import ABI from "../resources/NFT.json"

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart() {
  const { Moralis } = useMoralis();
  // const { saveFile } = useMoralisFile();
  const { generateMetadata } = useVerifyMetadata();
  // const { data: NFTBalances } = useNFTBalances();
  
  // console.log(provider);
  const [role, setRole] = useState();
  // const [contract, setContract] = useState();
  console.log("window");
  console.log(window.ethereum);
  let provider = ethers.getDefaultProvider();
  console.log(provider);

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    
    if (!role) {
        console.log("no role");
    }
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const fetchIPFSDoc = async (ipfsHash) => {
    const url = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
    console.log(url);
    try {
      const res = await fetch(url, {
        mode: 'cors'
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    };
  };

  const handleSubmit = async () => {
    const metadata = generateMetadata(role);
    console.log(metadata);
    const file = new Moralis.File("role.json", { base64: btoa(metadata) });
    if (file == null) {
      console.log("error! file is null");
      return;
    }
    const response = await file.saveIPFS();
    const data = await response.toJSON();
    console.log(data);
    console.log(file);
    const fileIpfs = file._ipfs;
    const fileHash = file._hash;
    console.log(fileHash);
    console.log(fileIpfs);
    const newResponse = fetchIPFSDoc(fileHash);
    console.log("new response");
    console.log(newResponse);
    return newResponse;
  };

  // const handleSubmit = async () => {
  //   // const options = {
  //   //   contractAddress: "0x78EaDe7acF24Abc952215D313b9F55A105c2D2b9",
  //   //   functionName: "safeMint",
  //   //   abi: ABI,
  //   //   image: "../resources/images/0.jpg"
  //   // }
  //   let abi = [
  //     "event ValueChanged(address indexed author, string oldValue, string newValue)",
  //     "constructor(string value)",
  //     "function getValue() view returns (string value)",
  //     "function setValue(string value)"
  // ];
  //   let contractAddress = "0x78EaDe7acF24Abc952215D313b9F55A105c2D2b9";
  //   let contract = new ethers.Contract(contractAddress, abi, provider);
    
  //   let currentValue = await contract.getValue();
  //   console.log(currentValue);
  // }

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <div style={styles.header}>
            <Blockie scale={5} avatar currentWallet style />
            <Address size="6" copyable />
            <NativeBalance />
          </div>
        }
      >
        {/* <Transfer /> */}
      </Card>
      <div>
        <Card
          style={styles.card}
          title={
            <>
              <Text strong>Select the role for the NFT</Text>
            </>
          }
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value={"DEFAULT_ADMIN_ROLE"}>Admin</MenuItem>
                <MenuItem value={"MODERATOR_ROLE"}>Moderator</MenuItem>
                <MenuItem value={"MINTER_ROLE"}>Minter</MenuItem>
                <MenuItem value={"USER_ROLE"}>User</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Card>
        <Card style={{ marginTop: "10px", ...styles.card }}>
          <Button
            type="submit"
            variant="contained"
            component="span"
            onClick={handleSubmit}
          >
            MINT NFT
          </Button>
        </Card>
      </div>
    </div>
  );
}
