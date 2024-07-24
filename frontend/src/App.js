import React from 'react';
import { ChakraProvider, Box, VStack, Heading, Button, Text, useToast, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Mint from './components/Mint';
import { WalletProvider, useWallet } from './WalletContext';
import { useNavigate } from 'react-router-dom';


function Header() {
  const { account, connectWallet, disconnectWallet, signer } = useWallet();
  const toast = useToast();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const handleWalletAction = async () => {
    if (account) {
      disconnectWallet();
      toast({
        title: 'Wallet Disconnected',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } else {
      const result = await connectWallet();
      if (result.success) {
        console.log(result);
        toast({
          title: 'Wallet Connected',
          description: `Connected to ${result.account}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: result.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex as="header" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="gray.600" boxShadow="sm">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'} color="purple.600" onClick={navigateHome} cursor="pointer" _hover={{ color: "purple.500" }}>
          Core NFT Minter
        </Heading>
      </Flex>

      <Box>
        <Button
          colorScheme={account ? 'red' : 'green'}
          onClick={handleWalletAction}
        >
          {account ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>
      </Box>
    </Flex>
  );
}

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Box minHeight="100vh" bg="gray.100">
          <Header />
          <VStack spacing={8} align="center" justify="center" py={10}>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/mint/:address" element={<Mint />} />
            </Routes>
          </VStack>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

function AppWithWallet() {
  return (
    <WalletProvider>
      <App />
    </WalletProvider>
  );
}

export default AppWithWallet;