import {useState, useEffect} from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineMail } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { toast } from 'react-toastify';
import { validateForm } from "@/utils/validationForm";
import GroupButtonModel from "@/components/Button/GroupButtonModel";
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function EditComponent({userid, email, password, user_role}) {
  const queryClient = useQueryClient();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [roles, setRole] = useState("");
  const [editEmail, setEditEmail] = useState(email);
  const [editPassword, setEditeditPassword] = useState(password);
  const [editRole, setEditeditRole] = useState(user_role);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  const {data, isSuccess} = useQuery({
    queryKey:['getAllRoles'],
    queryFn: ({signal}) => axios.get('/api/getAllRole', {signal})
  })

  useEffect(() => {
    if(isSuccess){
      setRole(data.data.role);
    }
  },[isSuccess, data]);

  const {name} = roles && roles.find(role => role.id === user_role);

  const mutation  = useMutation({
    mutationFn: async ({editEmail, editPassword, id, userid}) => {
      await axios.put('/api/crud', { editEmail, editPassword, id, userid});
    },
    onSuccess: () => {
      toast.success('Данные успешно загружены 👍');
      queryClient.invalidateQueries('userData');
    },
    onError: (error) => {
      if(error) toast.error('Произошла ошибка, попробуйте ещё раз');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  })

  const handleEmail = (value) => setEditEmail(value);
  const handlePassword = (value) => setEditeditPassword(value);
  const handleRole = (e) => setEditeditRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {id} = roles && roles.find(role => role.name === editRole) || roles.find(role => role.id === editRole);
    if(editEmail === email && editPassword === password && id === user_role) return;

    const validationError = validateForm(editEmail, editPassword);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsLoading(true);
    try {
      await mutation.mutateAsync({editEmail, editPassword, id, userid});
    } catch (error) {
      toast.error('Failed to update user');
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
              <ModalHeader className="flex flex-col gap-1">Edit user {email}</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MdOutlineMail className="text-xl mb-2 pointer-events-none flex-shrink-0" />
                  }
                  label="email"
                  defaultValue={email}
                  onValueChange={handleEmail}
                  variant="bordered"
                  autoComplete="email"
                />
                <Input

                  label="password"
                  endContent={
                    <button className="focus:outline-none pb-2" type="button" onClick={toggleVisibility}>
                    {isVisible ? <LuEyeOff/> : <LuEye />}
                    </button>
                }
                  type={isVisible ? "text" : "password"}
                  defaultValue={password.slice(1,20)}
                  onValueChange={handlePassword}
                  variant="bordered"
                  autoComplete="current-password"
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
