import { SwipeableDrawer } from '@mui/material'
// import { useNavigate } from 'react-router-dom'

const MobileMenuDrawer = ({ state, setState, toggleDrawer, data }) => {
  // const navigate = useNavigate()

  return (
    <div className='w-full'>
      <SwipeableDrawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        <div className='md:w-[400px] w-[60vw] py-5 px-8'>
         hello
        </div>
      </SwipeableDrawer >
    </div >
  )
}

export default MobileMenuDrawer