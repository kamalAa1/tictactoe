import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiCopy } from 'react-icons/bi';
import { IoCashOutline, IoCloudUpload, IoVideocam } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import ConfirmModal from './Modals/ConfirmModal';
import MyVideos from './MyVideos';
import TermsAndConditions from './TermsAndConditions';

const steps = [
  {
    text: 'Make video',
    icon: <IoVideocam size={20} className="w-6 h-6 text-purple-500" />,
  },
  {
    text: 'Upload video link',
    icon: <IoCloudUpload size={20} className="w-6 h-6 text-purple-500" />,
  },
  {
    text: 'Earn money',
    icon: <IoCashOutline size={20} className="w-6 h-6 text-purple-500" />,
  },
];

const PromotionalVideo = () => {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState('');

  const [searchParams] = useSearchParams();

  // Extract specific search params if needed
  const uid = searchParams.get('uid');
  const collection = searchParams.get('collection');

  const copyHandler = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('copied!');
    } catch (error) {
      toast.error('failed to copy!');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!url) {
      toast.error('Video url is required');
      return;
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    const getPromotionalTerms = async () => {
      try {
        setIsLoading(true);
        const raw = JSON.stringify({ uid, collection });

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const response = await fetch(
          'https://us-central1-rumbangapps-a056a.cloudfunctions.net/expressApi/firebaseServices/getPromotionalTerms',
          requestOptions
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setTerms(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching promotional terms:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getPromotionalTerms();
  }, [uid, collection]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Typography>Loading...</Typography>
        </div>
      )}
      {!isLoading && terms && (
        <div className="flex items-center justify-center bg-white mb-8">
          <div className="p-2 space-y-8">
            {terms && !terms.image ? (
              <div className="flex flex-col items-center justify-center bg-purple-50 rounded capitalize py-4">
                <Typography variant="lead">Upload your video to get</Typography>
                <Typography className="text-purple-500 font-bold text-3xl">
                  {terms?.reward}
                </Typography>
                <Typography variant="lead">
                  for every video you promote!
                </Typography>
              </div>
            ) : (
              <div className="bg-purple-50 p-2 rounded">
                <img
                  src={terms.image}
                  alt="promote_image"
                  className="w-full h-44 rounded"
                />
              </div>
            )}

            <ol className="grid grid-cols-3 gap-3 place-items-center">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 border flex items-center justify-center rounded-full">
                    <Typography>{step.icon}</Typography>
                  </div>
                  <Typography variant="small">{step.text}</Typography>
                </div>
              ))}
            </ol>
            <div className="bg-orange-500 p-2 rounded -mt-8">
              {terms && (
                <Typography
                  className="text-center"
                  variant="small"
                  color="white"
                >
                  {terms.desc}
                </Typography>
              )}
            </div>

            <form
              className="flex flex-col items-center justify-center gap-2"
              onSubmit={handleSubmit}
            >
              <Input
                type="url"
                label="Enter your video link"
                color="purple"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button
                type="submit"
                color="purple"
                className="shadow-none rounded w-1/2"
              >
                Submit
              </Button>
            </form>

            {terms && (
              <div>
                <div className="bg-purple-50 p-2 rounded flex items-center justify-start gap-2">
                  <Typography>Unique code : </Typography>
                  <Typography as={'div'} className="flex items-center gap-2">
                    <strong className="font-bold">{terms?.uniqueCode}</strong>
                    <Typography
                      onClick={() => copyHandler(terms?.uniqueCode)}
                      className="cursor-pointer"
                    >
                      <BiCopy className="text-purple-500" />
                    </Typography>
                  </Typography>
                </div>
                <Typography className="text-sm mt-1 text-start px-2">
                  <span className="font-semibold">Note :</span> {terms?.message}
                </Typography>
              </div>
            )}

            {terms && <TermsAndConditions terms={terms?.terms} />}

            <div className="flex items-center justify-center">
              <Button className="capitalize rounded" fullWidth color="purple">
                my videos
              </Button>
            </div>
            <MyVideos />
          </div>
        </div>
      )}
      {open && url && terms && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          data={{ url, uniqueCode: terms?.uniqueCode }}
        />
      )}
    </React.Fragment>
  );
};

export default PromotionalVideo;
