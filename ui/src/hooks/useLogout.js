import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { logout } from '../lib/api'

const useLogout = () => {
    const queryClient = useQueryClient()
    const { mutate: logoutMutation } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
            toast.success('Logout successful')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return logoutMutation


}

export default useLogout