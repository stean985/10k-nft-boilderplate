import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useWallet } from '../WalletContext';
import ABI from '../ABI/CoreNFT.json'
import { ethers } from 'ethers';

function Mint() {
  const {address} = useParams();
  const [nftInfo, setNftInfo] = useState(null);
  const toast = useToast();
  const {account, signer, provider} = useWallet();
  const [minted, setMinted] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchNftInfo = async () => {
        const contract = new ethers.Contract(address, ABI.abi, signer);
        const currentTokenID = await contract.getCurrentTokenId();
        const data = await contract.tokenURI(Number(currentTokenID.toString()) + 1);
        const response = await fetch(data);
        const metadata = await response.json();
        const name = await contract.name();
        const symbol = await contract.symbol();
      setNftInfo({
        name: name,
        symbol: symbol,
        image: metadata.image,
      });
    };

    fetchNftInfo();
  }, [address, minted, toast]);

  const handleMint = async () => {
    if (!account) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setMinted(false);
      setLoading(true);
   
      const contract = new ethers.Contract(address, ABI.abi, signer);   
      console.log(contract);

      console.log(account);
      const tx = await contract.safeMint(account);
      await tx.wait();
      toast({
        title: 'Success',
        description: 'NFT minted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setMinted(false);
      toast({
        title: 'Error',
        description: 'Failed to mint NFT',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
        setMinted(true);
        setLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied',
      description: 'Share this link with your friends to mint!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!nftInfo) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={6} width="100%" maxWidth="500px">
      <Heading size="xl" color="purple.600">
        {nftInfo.name} ({nftInfo.symbol})
      </Heading>
      <Image src={nftInfo.image} alt={nftInfo.name} borderRadius="lg" />
      <Button
        colorScheme="purple"
        size="lg"
        onClick={handleMint}
        width="100%"
        loadingText="Minting..."
        isLoading={loading}
      >
        Mint NFT
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={handleShare}
        width="100%"
      >
        Share Minting Link
      </Button>
    </VStack>
  );
}

export default Mint;
