import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const ConfirmModal = ({ open, setOpen, data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  // Extract specific search params if needed
  const uid = searchParams.get('uid');
  const collection = searchParams.get('collection');

  const submitHandler = async () => {
    const formattedData = {
      uid,
      collection,
      ...data,
    };

    try {
      setIsLoading(true);
      const raw = JSON.stringify(formattedData);

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://us-central1-rumbangapps-a056a.cloudfunctions.net/expressApi/firebaseServices/submitPromotionalUrl',
        requestOptions
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setIsLoading(false);
      toast.success(result.message);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching promotional terms:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={() => !isLoading && setOpen(false)}>
      <DialogHeader className="flex items-center justify-center">
        <Typography variant="lead">Confirmation</Typography>
      </DialogHeader>
      <DialogBody>
        <Typography className="text-center">
          Are your sure want to upload your video url?
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button
          fullWidth
          color="purple"
          className="rounded flex items-center justify-center"
          onClick={submitHandler}
          disabled={isLoading}
          loading={isLoading}
        >
          Yes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmModal;
