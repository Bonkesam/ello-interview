import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel
      # Add any other relevant fields
    }
  }
`;

// Helper functions
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// Fetch the books data
export default function BookSelection() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [leftSearch, setLeftSearch] = React.useState('');
  const [rightSearch, setRightSearch] = React.useState('');

  const { loading, error, data } = useQuery(GET_BOOKS);

  React.useEffect(() => {
    if (data) {
      // Initialize left and right arrays with the fetched book data
      setLeft(data.books.map((book) => ({
        title: book.title,
        author: book.author,
        coverPhotoURL: book.coverPhotoURL,
      })));
      setRight([]);
    }
  }, [data]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const filteredLeft = left.filter(book =>
    book.title.toLowerCase().includes(leftSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRight = right.filter(book =>
    book.title.toLowerCase().includes(rightSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(rightSearch.toLowerCase())
  );

  const customList = (title, items, searchValue, setSearchValue) => (
    <Card className="bg-[#FFFFFF] rounded-2xl shadow-md w-full">
      <CardHeader
        className="text-[#F76434] font-bold text-xl lg:text-2xl font-serif"
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        action={
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='w-[100px] lg:w-[100px] p-2'
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
        className='h-[80vh] lg:w-[40vw] w-[80vw]'
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.title}-label`;

          return (
            <ListItemButton
              key={value.title}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <div className="flex items-center">
                <img src={value.coverPhotoURL} alt={value.title} className="mr-3 w-24 h-24 object-cover" />
                <ListItemText
                  id={labelId}
                  primary={<span className="font-bold">{value.title}</span>}
                  secondary={value.author}
                />
              </div>
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full rounded-xl">
      <div className="w-full max-w-7xl mx-auto">
        <Grid className="py-10 px-8 w-full justify-between items-center flex flex-col lg:flex-row gap-5 lg:gap-8">
          <Grid item>{customList('Available Books', filteredLeft, leftSearch, setLeftSearch)}</Grid>
          <Grid item>
            <Grid className='flex flex-col items-center' direction="column">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
                className="rounded-full bg-teal text-[#FFFFFF] hover:bg-[#FABD33] text-[10px]"
              >
                Assign &gt; 
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
                className="rounded-full bg-[#28b8b8] hover:bg-[#F76434] text-white text-[10px]"
              >
                &lt; Remove
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            {customList('Reading List', filteredRight, rightSearch, setRightSearch)}
          </Grid>
        </Grid>
      </div>
    </div>  
  );
}
