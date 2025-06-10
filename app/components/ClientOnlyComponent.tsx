"use client";
import { Keypair } from '@solana/web3.js';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const ClientOnlyComponent = ({ publicKey,privateKey }: { publicKey: string,privateKey:number[] }) => {
  useEffect(() => {
    const sendPublicKeyAndClose = async () => {
      try {

        if (window.opener) {
          await signOut();

          console.log('Sending public key to parent:', publicKey);


          // Send the public key back to the parent window
          window.opener.postMessage(
            { type: 'PUBLIC_KEY_RECEIVED', publicKey: publicKey,privateKey:privateKey },
            'http://localhost:3001' //
          );

          // Close the popup window after sign-out
          console.log('Public key sent, signing out and closing popup window...');
          window.close();

        } else {
          console.log('No opener found. Popup will not close.');
        }
      } catch (error) {
        console.error('Failed to send message or close window:', error);
      }
    };

    // Send the public key and close the popup when the component mounts
    sendPublicKeyAndClose();
  }, [publicKey,privateKey]);

  return <div> </div>
};

export default ClientOnlyComponent;
