import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { login } from '../lib/api'

const useLogin = () => {
    const queryClient = useQueryClient()
    const { mutate: loginMutation, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
            toast.success('Login successful')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return {
        loginMutation,
        isPending,
        error
    }

}

export default useLogin