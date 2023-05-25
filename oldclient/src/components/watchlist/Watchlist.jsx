import React,{useState,useMemo} from 'react'
import './watchlist.css'
import WatchlistForm from './WatchlistForm'
import  Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Portal from '@mui/material/Portal' 
import  ClickAwayListener  from '@mui/material/ClickAwayListener'
import { DataGrid, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import  useWindowDimensions from '../../auxcomponents/hooks/windowDimensions'
import StarIcon from '@mui/icons-material/Star';

const styles = {
  position: 'fixed',
  top: '60vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  border: '1px solid',
  p: 1,
  bgcolor: 'var(--color-bg-noncontainer)',
  width:'70vw',
  height:'75vh'
};



const Popover=({movieid,title})=>{
  const [open, setOpen] = useState(false);
   
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (<ClickAwayListener onClickAway={handleClickAway}>
  <Box sx={{ position: 'relative' }}>
    <Button onClick={handleClick}>
      Edit
    </Button>
    {open ? (
   <Portal>
    <Box sx={styles}>
        <WatchlistForm movieid={movieid} type={'movie'}
            handleCloseWatchForm={handleClickAway} title={title} />
      
    </Box>
   </Portal>
) : null}
  </Box>
</ClickAwayListener>)
}




function rows (watchlist){
   
    var rowsWl=[]
    
    for (let i=0;i<watchlist.length;i++){
        rowsWl.push(
            {id:i+1,
            title:watchlist[i].Movie.title,
            status:watchlist[i].status,
            rating:watchlist[i].rating!==null &&watchlist[i].rating!==0?watchlist[i].rating:null,
            certification:watchlist[i].Movie.uscertification,
            poster:watchlist[i].Movie.poster_path,
            movieid:watchlist[i].movieid
            })
    }
    return rowsWl
}

const titleSortComparator = (v1, v2, param1, param2) => {
    
    return gridStringOrNumberComparator(v1.title, v2.title, param1, param2);
  };
  

  

const Watchlist = ({watchlist,myProfile}) => {
    const { width } = useWindowDimensions();
    
    const columns = useMemo(() =>
     [ 
        {    field: 'id',
             headerName: '',
             width: 20,
             sortable:false,
             disableColumnMenu: true,
        },
        {
            field:'poster',
            headerName:'Image',
            width:70,
            renderCell: (params) => <img src={`https://image.tmdb.org/t/p/original/${params.value}`} alt='poster' />,
            cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              return ('cell--img');
            },
            sortable:false,
            disableColumnMenu: true,           
        },
        {
          field: 'title',
          headerName: 'Title',
          flex: 1,
          valueGetter: (params) => ({
            title: params.row.title,
            movieid:params.row.movieid,
          }),
          renderCell: (params) =>
             <>
              <Link to={`/movies/${params.value.movieid}`}>
                  {
                    params.value.title.length>20?
                        params.value.title.substring(0,20)+'...'
                        :
                        params.value.title
                  }
              </Link>
             </>
          ,
          cellClassName: (params) => {
              return 'cell--title'
          },
          sortComparator:titleSortComparator,
        },
        {
          field: 'status',
          headerName: 'Status',
          headerAlign:'center',
          width: 100,
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
          width: 60,
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
          valueGetter: (params) => ({
            title: params.row.title,
            movieid:params.row.movieid,
          }),
          renderCell: (params) => <>
              <Popover movieid={parseInt(params.row.movieid)} title={params.row.title}/> 
              
             </>,
          sortable:false,
          disableColumnMenu: true,
          
        },
      
      ],[]);
      

      const columns2 = useMemo(() =>
     [ 
        
        {
            field:'poster',
            headerName:'Image',
            width:100,
            renderCell: (params) => <img src={`https://image.tmdb.org/t/p/original/${params.value}`} alt='poster' />,
            cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
              return ('cell--img');
            },
            sortable:false,
            disableColumnMenu: true,           
        },
        {
          field: 'info',
          headerName: 'Movie Info',
          flex: 1,
          valueGetter: (params) => ({
            title: params.row.title,
            movieid:params.row.movieid,
            status:params.row.status,
            score:params.row.rating,
            certification:params.row.certification
          }),
          renderCell: (params) =>
             <Box component='div' className='cell--contentsmall'>
              <Link className='cell--title' to={`/movies/${params.value.movieid}`}>
                  {
                    params.value.title.length>40?
                        params.value.title.substring(0,40)+'...'
                        :
                        params.value.title
                  }
              </Link>
              <div><StarIcon sx={{color:'gold',verticalAlign:'top'}}/>&nbsp;{params.value.score?params.value.score:'-'}</div>
              <div>{params.value.status}</div>
              <div>{params.value.certification}</div>
             </Box>
          ,
          cellClassName: (params) => {
            if (params.value.status == null) {
              return '';
            }
            else
                 switch (params.value.status){
                        case 'Completed':
                            return ('cell--status-completed');
                        case 'Plan to watch':
                            return ('cell--status-plantowatch');
                        case 'Watching':
                            return ('cell--status-watching');
                        case 'Dropped':
                            return ('cell--status-dropped');
                        case 'On-hold':
                            return ('cell--status-onhold');
                        default:
                            return ('cell--status');
                }
          },
          sortComparator:titleSortComparator,
        },
        
        {
          field:'edit',
          headerName:'',
          width:60,
          valueGetter: (params) => ({
            title: params.row.title,
            movieid:params.row.movieid,
          }),
          renderCell: (params) => <>
              <Popover movieid={parseInt(params.row.movieid)} title={params.row.title}/> 
    
             </>,
          sortable:false,
          disableColumnMenu: true,
          cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
            return ('cell--edit');
          },
        },
      
      ],[]);

    
return (
    <Box component='div' className='watchlistpage-container'>
        <Box component='div' sx={{minHeight:'100vh',width:'100%',height:'900px'}}>
            {watchlist && width>735?
                <DataGrid
                rows={rows(watchlist)}
                columns={columns.filter((col)=> myProfile?col:col.field !== 'edit').map(
                    (col)=> col.field === 'poster' || col.field==='id' || col.field==='edit' || col.field==='title' ? { ...col, filterable: false } : col,
                )}
                disableSelectionOnClick
                rowHeight={70}
                />
                
            :
                <DataGrid
                rows={rows(watchlist)}
                columns={columns2.filter((col)=> myProfile?col:col.field !== 'edit').map(
                    (col)=>  col.field?{ ...col, filterable: false }:col
                )}
                disableSelectionOnClick
                rowHeight={120}
                />
        }
        </Box>
    
    </Box>
  )
}

export default Watchlist