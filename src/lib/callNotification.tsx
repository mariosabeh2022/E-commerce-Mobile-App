import {API_URL} from '../config/index';

type Location = {
  latitude: number;
  longitude: number;
  name: string;
};

type Data = {
  createdAt: string;
  description: string;
  images: any[];
  location: Location;
  price: number;
  title: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

export const callNotification = (data: Data) => {
  const url = 'https://onesignal.com/api/v1/notifications';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Basic -',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      app_id: '-',
      headings: {en: `Checkout This New "${data.title}"`},
      contents: {
        en: `Only For "${data.price}$"`,
      },
      big_picture: `${API_URL + data.images[0].url}`,
      include_subscription_ids: ['a8631efc-abdc-47a9-b4df-b9fae43c4bb9'],
      url: `ecommerceMobileApp://details/${data._id}`,
    }),
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};
