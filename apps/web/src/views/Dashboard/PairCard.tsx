import { Card, CardContent } from '@/components/ui/card'
import { Pair } from '@/types'

interface PairCardProps {
  pair: Pair
  isSelected: boolean
  onSelect: () => void
}

  export function PairCard({ pair, isSelected, onSelect }: PairCardProps) {
  return (
    <Card 
      role='button'
      tabIndex={0}
      className={`transition-all duration-300 cursor-pointer hover:shadow-md bg-foreground ${
        isSelected ? 'ring-2 ring-blue-600 bg-primary text-white' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className='flex flex-wrap gap-2'>
              <strong>{pair.baseAsset}</strong>
              <span>/</span>
              <span>{pair.quoteAsset}</span>
            </p>
          </div>
          {isSelected && (
            <div className="text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

