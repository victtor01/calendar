import { IoMdNotificationsOutline } from 'react-icons/io'
import Button from '../button';
export default function UserComponents() {
  return (
    <div className="flex p-1 items-center gap-3">
      <Button className="flex hover:bg-zinc-400 hover:bg-opacity-10 rounded-full h-12 items-center">
        <IoMdNotificationsOutline size="23"/>
      </Button>
      <Button className="flex bg-zinc-400 rounded-full h-10 w-10 items-center">
        
      </Button>
    </div>
  );
}
