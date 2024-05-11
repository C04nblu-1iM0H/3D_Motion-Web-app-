import {useState, useEffect} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineMail } from "react-icons/md";
import { toast } from 'react-toastify';
import { validateGoogleForm } from "@/utils/validationForm";
import GroupButtonModel from "@/components/Button/GroupButtonModel";
import 'react-toastify/dist/ReactToastify.css';


export default function EditGoogle({userid, emailGoogle, user_role}) {
  const queryClient = useQueryClient();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [roles, setRole] = useState("");
  const [editEmailGoogle, setEditEmailGoogle] = useState(emailGoogle);
  const [editRole, setEditeditRole] = useState(user_role);
  const [isLoading, setIsLoading] = useState(false);

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
    mutationFn: async ({user_id, editEmailGoogle, id}) => {
      await axios.put('/api/googlecrud', {user_id, editEmailGoogle, id});
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
      await mutation.mutateAsync({user_id, editEmailGoogle, id});
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
