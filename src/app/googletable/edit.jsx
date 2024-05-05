import {useState, useEffect} from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineMail } from "react-icons/md";
import { toast } from 'react-toastify';
import { validateGoogleForm } from "@/utils/validationForm";
import GroupButtonModel from "@/components/Button/GroupButtonModel";
import 'react-toastify/dist/ReactToastify.css';

export default function EditGoogle({userid, emailGoogle, user_role, onSuccess}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [roles, setRole] = useState("");
  const [editEmailGoogle, setEditEmailGoogle] = useState(emailGoogle);
  const [editRole, setEditeditRole] = useState(user_role);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/googlecrud');
          setRole(response.data.role);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
  },[]);

  const {name} = roles && roles.find(role => role.id === user_role);

  const handleEmail = (value) => setEditEmailGoogle(value);
  const handleRole = (e) => setEditeditRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = userid;
    const {id} = roles && roles.find(role => role.name === editRole) || roles.find(role => role.id === editRole);
    if(editEmailGoogle === emailGoogle && id === user_role) return;

    const validationError = validateGoogleForm(editEmailGoogle);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsLoading(true);
    try {
      const updateUserPromise = toast.promise(
        axios.post('/api/googlecrud', {user_id, editEmailGoogle, id}),
        {
          pending: "Подождите пожалуйста...",
          success: "Данные успешно загружены 👍",
          error: "Произошла ошибка, попробуйте ещё раз"
        }
      );
      const response = await updateUserPromise;
      if(response.status === 200){
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to sign up");
    } finally{
      setIsLoading(false);
    }
  }

  return ( 
    <>
      <Button size="sm" variant="light" onPress={onOpen}><LiaEdit className="w-5 h-5 text-warning-600"/></Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Edit user {emailGoogle}</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MdOutlineMail className="text-xl mb-2 pointer-events-none flex-shrink-0" />
                  }
                  label="email"
                  defaultValue={emailGoogle}
                  onValueChange={handleEmail}
                  variant="bordered"
                  autoComplete="emailGoogle"
                />
                <Select
                  label="role"
                  defaultSelectedKeys={[name]}
                  className="w-full"
                  variant="bordered"
                  onChange={handleRole}
                >
                  {roles && roles.map((role) => (
                    <SelectItem key={role.name} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </Select>
                </ModalBody>
                <GroupButtonModel isLoading={isLoading} onClose={onClose}/>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
