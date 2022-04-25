import React,{useState,useEffect} from 'react'
import './watchlist.css'
import WatchlistForm from './WatchlistForm'
import { Box,Button,Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

//TODO verificat daca row poate avea param care nu sunt in col

function rows (watchlist){
   
    var rowsWl=[]
    
    for (let i=0;i<watchlist.length;i++){
        console.log(watchlist[i].rating)
        rowsWl.push(
            {id:i+1,
            title:{title:watchlist[i].Movie.title,movieid:watchlist[i].movieid},
            status:watchlist[i].status,
            rating:watchlist[i].rating!==null &&watchlist[i].rating!==0?watchlist[i].rating:null,
            certification:watchlist[i].Movie.uscertification,
            poster:watchlist[i].Movie.poster_path,
            edit:{movieid:watchlist[i].movieid,title:watchlist[i].Movie.title}
            })
    }
    return rowsWl
}

//TODO handle sort la title


const Watchlist = ({watchlist}) => {
    const [openWatchForm, setOpenWatchForm] = useState(false);
    const handleOpenWatchForm = () => setOpenWatchForm(true);
    const handleCloseWatchForm = () => setOpenWatchForm(false);

    const columns = [
        { field: 'id', headerName: '', width: 10 },
        {
            field:'poster',
            headerName:'Image',
            width:80,
            renderCell: (params) => <img src={`https://image.tmdb.org/t/p/original/${params.value}`} alt='poster' />,
            cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              return ('cell--img');
            },
            sortable:false,
            filtarable:false,            
        },
        {
          field: 'title',
          headerName: 'Title',
          flex: 1,
          renderCell: (params) => <>
              <Link to={`/movies/${params.value.movieid}`}>
                  {params.value.title}
              </Link>
              {/* <Button variant='text'>
                  Edit
              </Button> */}
             </>
          ,
          cellClassName: (params) => {
              return 'cell--title'
          },
        },
        
        {
          field: 'status',
          headerName: 'Status',
          width: 130,
          cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              else
                   switch (params.value){
                          case 'Completed':
                              return ('cell--status completed');
                          case 'Plan to watch':
                              return ('cell--status plantowatch');
                          case 'Watching':
                              return ('cell--status watching');
                          case 'Dropped':
                              return ('cell--status dropped');
                          case 'On-hold':
                              return ('cell--status onhold');
                          default:
                              return ('cell--status');
                  }
            },
        },
        {
          field: 'rating',
          headerName: 'Score',
          type: 'number',
          headerAlign:'center',
          width: 80,
          cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              return 'cell--center';
          }
        },
        {
          field:'certification',
          headerName:"Certification",
          width:100,
          cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              return 'cell--center';
          }
        },
      
        {
          field:'edit',
          headerName:'',
          width:70,
          renderCell: (params) => <>
              <Button variant='text' onClick={handleOpenWatchForm}>
                  Edit
              </Button> 
              <Modal
                  open={openWatchForm}
                  onClose={(e) => {
                      e.preventDefault();
                      handleCloseWatchForm();
                  }}
                  aria-labelledby={'add'+params.value.title}
                  aria-describedby="formWatchlist"
                  >
                  <Box className='watchformmodal'>
                      <Box  sx={{width:'70vw',height:'90vh'}} component="div">
                      <WatchlistForm movieid={parseInt(params.value.movieid)} type={'movie'}
                          handleCloseWatchForm={handleCloseWatchForm} title={params.value.title} episodesTotal={1}/>
                      </Box>
                  </Box>
              </Modal>
             </>,
          sortable:false,
          filtarable:false,
          
        },
      
      ];
      


    
return (
    <Box component='div'>
        {watchlist && 
        <Box component='div' style={{height:'100vh',width:'100%'}}>
            <DataGrid
            rows={rows(watchlist)}
            columns={columns}
            disableSelectionOnClick
            rowHeight={70}
            />
        </Box>
        }
    
    </Box>
  )
}

export default Watchlist