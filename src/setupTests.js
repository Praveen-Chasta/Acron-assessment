/* eslint-disable */

import '@testing-library/jest-dom'
import {configure} from '@testing-library/react'

configure({testIdAttribute: 'data-testid'})

https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow