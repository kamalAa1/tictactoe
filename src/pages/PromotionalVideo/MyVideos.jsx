import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();

  // Extract specific search params if needed
  const uid = searchParams.get('uid');
  const collection = searchParams.get('collection');

  useEffect(() => {
    const fetchMyPromotionalVideos = async () => {
      try {
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
          'https://us-central1-rumbangapps-a056a.cloudfunctions.net/expressApi/firebaseServices/fetchMyPromotionalVideos',
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setVideos(result?.promos);
      } catch (error) {
        console.error('Error fetching promotional terms:', error);
      }
    };

    fetchMyPromotionalVideos();
  }, [uid, collection]);

  return (
    <div>
      <ol>
        {videos &&
          videos?.map((video, index) => {
            const videoId = video.url.split('v=')[1];

            const timestamp = new Date(
              video.time._seconds * 1000
            ).toLocaleString();

            return (
              <li
                key={index}
                className="bg-gray-100 rounded p-2 mb-2 flex items-center justify-between gap-3"
              >
                <YouTube
                  videoId={videoId}
                  opts={{
                    height: '70',
                    width: '120',
                  }}
                />
                <div>
                  <Typography variant="small">
                    <span className="font-semibold text-xs">Next Reward :</span>{' '}
                    {video.reward}{' '}
                  </Typography>
                  <Typography variant="small">
                    <span className="font-semibold text-xs">
                      Current views :
                    </span>{' '}
                    {video.views} views
                  </Typography>
                  <Typography variant="small">
                    <span className="font-semibold text-xs">
                      Next milestone :
                    </span>{' '}
                    {video.milestone} milestone
                  </Typography>
                  <Typography variant="small">
                    <span className="font-semibold text-xs">Time :</span>{' '}
                    {moment(timestamp).format('lll')}{' '}
                  </Typography>
                </div>
              </li>
            );
          })}
        <li></li>
      </ol>
    </div>
  );
};

export default MyVideos;
