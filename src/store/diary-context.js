import React from 'react';
import { useState } from 'react';

import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import storage from '../helper/firebase/firebaseConfig';

const defaultDiaryState = {
  recapList: [],
  recapItem: {},
  itemImagesList: [],
};

export const DiaryContext = React.createContext({
  recapList: [],
  recapItem: {},
  itemImagesList: [],
  fetchRecapList: async (url) => {},
  fetchItemRecap: async (url, id) => {},
  fetchImagesItemRecap: async (url, id) => {},
  uploadRecapItem: async (recapItem) => {},
  updateRecapItem: async (url, recapItem, id) => {},
  updateImagesItem: async (selectedImages, imagesReferences) => {},
  deleteRecapItem: async (id) => {},
});

const DiaryProvider = (props) => {
  const [diaryState, setDiaryState] = useState(defaultDiaryState);

  const fetchRecapListHandler = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      const loadedRecap = [];
      for (const key in data) {
        loadedRecap.push({
          id: key,
          date: data[key].date,
          teamScore: data[key].teamScore,
          opponentScore: data[key].opponentScore,
          opponent: data[key].opponent,
          title: data[key].title,
          imagesRef: data[key].imagesRef,
          video: data[key].video,
        });
      }

      setDiaryState((prevState) => {
        return {
          ...prevState,
          recapList: loadedRecap,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemRecapHandler = async (url, id) => {
    try {
      const response = await fetch(`${url}/diary-files/${id}.json`);

      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const data = await response.json();

      setDiaryState((prevState) => {
        return {
          ...prevState,
          recapItem: data,
        };
      });

      return () => {
        setDiaryState((prev) => {
          return {
            ...prev,
            recapItem: defaultDiaryState.recapItem,
          };
        });
      };
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImagesItemHandler = async (url, id) => {
    try {
      const response = await fetch(`${url}/diary-files/${id}.json`);

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const { imagesRef } = await response.json();

      const itemImagesRef = ref(storage, imagesRef);
      await listAll(itemImagesRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setDiaryState((prevState) => {
              return {
                ...prevState,
                itemImagesList: [...prevState.itemImagesList, url],
              };
            });
          });
        });
      });

      // use Closure to reset state in Component will unMount
      return () => {
        setDiaryState((prevState) => {
          return {
            ...prevState,
            itemImagesList: defaultDiaryState.itemImagesList,
          };
        });
      };
    } catch (error) {
      console.log(error);
    }
  };

  const uploadRecapItemHandler = async (
    url,
    recapItem,
    imagesUpload,
    fileName,
    userUID
  ) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(recapItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      await Promise.all(
        imagesUpload.map((image) => {
          const imageRef = ref(
            storage,
            `${userUID}/diary/images-${fileName}/${image.name}`
          );
          return uploadBytes(imageRef, image);
        })
      ).catch((error) => {
        throw new Error(error);
      });

      await fetchRecapListHandler(url);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const updateRecapItemHandler = async (url, recapItem, id) => {
    try {
      const response = await fetch(`${url}/diary-files/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(recapItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      await fetchItemRecapHandler(url, id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImagesItemHandler = async (
    selectedImages,
    imagesReferences,
    url,
    id
  ) => {
    try {
      await Promise.all(
        selectedImages.map((image) => {
          const imageRef = ref(storage, `${imagesReferences}/${image.name}`);
          return uploadBytes(imageRef, image);
        })
      );

      await fetchImagesItemHandler(url, id);
      return setDiaryState((prev) => {
        return {
          ...prev,
          itemImagesList: defaultDiaryState.itemImagesList,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteRecapItemHandler = async (url, id) => {
    try {
      const response = await fetch(`${url}/diary-files/${id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return;

      // delete images
      const { imagesRef } = diaryState.recapList.find((item) => item.id === id);
      const deleteRef = ref(storage, imagesRef);
      await listAll(deleteRef).then((response) => {
        response.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
      });

      await fetchRecapListHandler(`${url}/diary-files.json`);
    } catch (error) {
      console.log(error);
    }
  };

  const diaryContext = {
    recapList: diaryState.recapList,
    recapItem: diaryState.recapItem,
    itemImagesList: diaryState.itemImagesList,
    fetchRecapList: fetchRecapListHandler,
    fetchItemRecap: fetchItemRecapHandler,
    fetchImagesItemRecap: fetchImagesItemHandler,
    uploadRecapItem: uploadRecapItemHandler,
    updateRecapItem: updateRecapItemHandler,
    updateImagesItem: updateImagesItemHandler,
    deleteRecapItem: deleteRecapItemHandler,
  };

  return (
    <DiaryContext.Provider value={diaryContext}>
      {props.children}
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;
