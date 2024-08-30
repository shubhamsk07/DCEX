"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const ClientOnlyComponent = ({ publicKey }: { publicKey: string }) => {
  useEffect(() => {
    const sendPublicKeyAndClose = async () => {
      try {
      
        if (window.opener) {
          await signOut();
          
          console.log('Sending public key to parent:', publicKey);
           
          
          // Send the public key back to the parent window
          window.opener.postMessage(
            { type: 'PUBLIC_KEY_RECEIVED', publicKey: publicKey },
            'http://localhost:3001' // Ensure this is the correct origin of the parent
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
  }, [publicKey]);

  return <div>Loading...</div>; // Optional, depending on your UI
};

export default ClientOnlyComponent;
