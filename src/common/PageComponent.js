import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

function PageComponent({serverData, movePage, updateDay, platform}) {

    return (
      <div className="m-6 flex justify-center cursor-pointer" >
        {serverData.prev ?
          <IconButton
            className="m-2 p-2 size-10 text-center text-sm"
            onClick={() => movePage({ page: serverData.prevPage })}
            sx={{ m: 1.2 }}
          >
            <NavigateBeforeIcon color='dark'/></IconButton> : <></>
        }
        {serverData.pageNumList.map((pageNum) => (
          <IconButton
            key={pageNum}
            className="m-2 p-2 size-10"
            onClick={() => movePage({ page: pageNum, updateDay: updateDay, platform : platform }) }
            color={`${serverData.current === pageNum ? 'primary' : 'dark'}`}
            size="small"
            sx={{ m: 1 }}
            >
            <p className={`text-sm`}>{pageNum}</p>
          </IconButton>

        ))}
        {serverData.next ? 
          <IconButton
            className="m-2 p-2 size-10 text-center text-sm"
            onClick={() => movePage({ page: serverData.nextPage })}
            sx={{ m: 1.2 }}>
            <NavigateNextIcon color='dark'/>
          </IconButton> : <></>}
      </div>

    );
}

export default PageComponent;