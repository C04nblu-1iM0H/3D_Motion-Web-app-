import {Button, ModalFooter} from "@nextui-org/react";

export default function GroupButtonModel({isLoading, onClose}){
    
    return(
        <ModalFooter>
            <Button color="success" variant="ghost" type="submit" isLoading={isLoading}>Save</Button>
            {isLoading
                ?<Button color="danger" variant="ghost" onPress={onClose} isDisabled >Close</Button>
                :<Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
            }
        </ModalFooter>
    )
}