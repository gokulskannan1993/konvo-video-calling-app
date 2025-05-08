
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api.js';

const useSignUp = () => {



    const queryClient = useQueryClient();


    const { mutate: signUpMutation, isPending, error } = useMutation({
        mutationFn: signUp,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
    });
    return (
        {
            signUpMutation,
            isPending,
            error
        }
    )
}

export default useSignUp