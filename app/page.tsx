'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Matches = {
  matchScore: number;
  title: string;
  description: string;
  mbti: string[];
  hollandPrimary: string[];
  intelligences: string[];
  weight: number;
}

const CareerFitter = () => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<{ mbti: string, hollandCode: string, intelligences: string[] }>({
    mbti: '',
    hollandCode: '',
    intelligences: []
  });
  const [results, setResults] = useState<Matches[]>([]);

  const MBTI_TYPES = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const HOLLAND_CODES = [
    'REALISTIC', 'INVESTIGATIVE', 'ARTISTIC',
    'SOCIAL', 'ENTERPRISING', 'CONVENTIONAL'
  ];

  const INTELLIGENCES = [
    { id: 'linguistic', name: 'Linguistic (Words/Language)' },
    { id: 'logical', name: 'Logical-Mathematical' },
    { id: 'spatial', name: 'Visual-Spatial' },
    { id: 'musical', name: 'Musical' },
    { id: 'kinesthetic', name: 'Bodily-Kinesthetic' },
    { id: 'interpersonal', name: 'Interpersonal (Social)' },
    { id: 'intrapersonal', name: 'Intrapersonal (Self-Understanding)' },
    { id: 'naturalistic', name: 'Naturalistic (Nature/Patterns)' }
  ];

  const CAREERS_DATABASE = [
    {
      title: 'Creative Systems Architect',
      description: 'Designs innovative organizational systems and user experiences',
      mbti: ['INTP', 'INTJ', 'ENTP'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'spatial', 'intrapersonal'],
      weight: 1.2
    },
    {
      title: 'Future Experience Designer',
      description: 'Creates speculative and innovative user experiences',
      mbti: ['INFP', 'ENFP', 'INTP', 'ENTP'],
      hollandPrimary: ['ARTISTIC', 'INVESTIGATIVE'],
      intelligences: ['spatial', 'interpersonal', 'logical'],
      weight: 1.1
    },
    {
      title: 'Information Ecologist',
      description: 'Optimizes and designs information ecosystems',
      mbti: ['INTP', 'INTJ', 'INFJ'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'naturalistic', 'spatial'],
      weight: 1.1
    },
    {
      title: 'Design Systems Strategist',
      description: 'Develops cohesive design languages and organizational systems',
      mbti: ['INTJ', 'ENTJ', 'INTP'],
      hollandPrimary: ['ARTISTIC', 'CONVENTIONAL'],
      intelligences: ['spatial', 'logical', 'linguistic'],
      weight: 1.0
    },
    {
      title: 'Digital Experience Architect',
      description: 'Creates innovative digital spaces and interaction systems',
      mbti: ['INTP', 'INTJ', 'INFJ'],
      hollandPrimary: ['ARTISTIC', 'INVESTIGATIVE'],
      intelligences: ['spatial', 'logical', 'intrapersonal'],
      weight: 1.2
    },
    {
      title: 'Innovation Systems Consultant',
      description: 'Designs creative frameworks for organizational innovation',
      mbti: ['ENTP', 'INTP', 'ENTJ'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'interpersonal', 'spatial'],
      weight: 1.1
    },
    {
      title: 'Creative Technology Director',
      description: 'Leads innovative technical and creative initiatives',
      mbti: ['ENTJ', 'INTJ', 'ENTP'],
      hollandPrimary: ['ARTISTIC', 'ENTERPRISING'],
      intelligences: ['logical', 'interpersonal', 'spatial'],
      weight: 1.1
    },
    {
      title: 'Speculative Systems Designer',
      description: 'Envisions and creates future-focused organizational systems',
      mbti: ['INTP', 'ENTP', 'INTJ'],
      hollandPrimary: ['ARTISTIC', 'INVESTIGATIVE'],
      intelligences: ['logical', 'spatial', 'naturalistic'],
      weight: 1.2
    },
    {
      title: 'Digital Space Curator',
      description: 'Organizes and optimizes digital environments and experiences',
      mbti: ['ISFP', 'INFP', 'INTP'],
      hollandPrimary: ['ARTISTIC', 'CONVENTIONAL'],
      intelligences: ['spatial', 'interpersonal', 'logical'],
      weight: 1.0
    },
    {
      title: 'Experience Optimization Strategist',
      description: 'Creates and refines user experience systems',
      mbti: ['INTJ', 'ENTJ', 'INTP'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'interpersonal', 'spatial'],
      weight: 1.1
    },
    {
      title: 'Creative Systems Theorist',
      description: 'Develops theoretical frameworks for creative processes',
      mbti: ['INTP', 'INTJ', 'ENTP'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'linguistic', 'intrapersonal'],
      weight: 1.2
    },
    {
      title: 'Interactive Environment Designer',
      description: 'Designs innovative spaces for digital interaction',
      mbti: ['INFP', 'INTP', 'ENFP'],
      hollandPrimary: ['ARTISTIC', 'INVESTIGATIVE'],
      intelligences: ['spatial', 'kinesthetic', 'logical'],
      weight: 1.1
    },
    {
      title: 'Design Operations Architect',
      description: 'Creates systematic approaches to creative processes',
      mbti: ['INTJ', 'ISTJ', 'INTP'],
      hollandPrimary: ['CONVENTIONAL', 'ARTISTIC'],
      intelligences: ['logical', 'spatial', 'interpersonal'],
      weight: 1.0
    },
    {
      title: 'Future Systems Analyst',
      description: 'Analyzes and designs innovative organizational systems',
      mbti: ['INTP', 'INTJ', 'ENTP'],
      hollandPrimary: ['INVESTIGATIVE', 'ARTISTIC'],
      intelligences: ['logical', 'naturalistic', 'spatial'],
      weight: 1.1
    }
  ];

  const calculateMatches = () => {
    const matches = CAREERS_DATABASE.map(career => {
      let score = 0;

      // MBTI Match (30% weight)
      if (career.mbti.includes(profile.mbti)) {
        score += 30;
      }

      // Holland Code Match (30% weight)
      if (career.hollandPrimary.includes(profile.hollandCode)) {
        score += 30;
      }

      // Multiple Intelligences Match (40% weight)
      const intelligenceScore = profile.intelligences.reduce((acc, intel, index) => {
        if (career.intelligences.includes(intel)) {
          // Weight by order: 20% for first, 13% for second, 7% for third
          return acc + (20 - (index * 6.5));
        }
        return acc;
      }, 0);

      score += intelligenceScore;

      return {
        ...career,
        matchScore: Math.round(score * career.weight)
      };
    });

    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  };

  const handleSelectMBTI = (type: string) => {
    setProfile(prev => ({ ...prev, mbti: type }));
    setStep(1);
  };

  const handleSelectHolland = (code: string) => {
    setProfile(prev => ({ ...prev, hollandCode: code }));
    setStep(2);
  };

  const handleSelectIntelligence = (intelligence: string) => {
    setProfile(prev => {
      const updatedIntelligences = [...prev.intelligences];
      if (!updatedIntelligences.includes(intelligence)) {
        if (updatedIntelligences.length < 3) {
          updatedIntelligences.push(intelligence);
        }
      } else {
        const index = updatedIntelligences.indexOf(intelligence);
        updatedIntelligences.splice(index, 1);
      }
      return { ...prev, intelligences: updatedIntelligences };
    });

    if (profile.intelligences.length === 2) {
      const matches = calculateMatches();
      setResults(matches);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select your MBTI Type:</h2>
            <div className="grid grid-cols-4 gap-2">
              {MBTI_TYPES.map(type => (
                <Button
                  key={type}
                  onClick={() => handleSelectMBTI(type)}
                  variant={profile.mbti === type ? "default" : "outline"}
                  className="w-full"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select your primary Holland Code interest:</h2>
            <div className="grid grid-cols-2 gap-2">
              {HOLLAND_CODES.map(code => (
                <Button
                  key={code}
                  onClick={() => handleSelectHolland(code)}
                  variant={profile.hollandCode === code ? "default" : "outline"}
                  className="w-full"
                >
                  {code}
                </Button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select your top 3 Multiple Intelligences (in order):</h2>
            <div className="grid grid-cols-2 gap-2">
              {INTELLIGENCES.map(intel => (
                <Button
                  key={intel.id}
                  onClick={() => handleSelectIntelligence(intel.id)}
                  variant={profile.intelligences.includes(intel.id) ? "default" : "outline"}
                  className="w-full"
                  disabled={profile.intelligences.length >= 3 && !profile.intelligences.includes(intel.id)}
                >
                  {intel.name}
                  {profile.intelligences.includes(intel.id) &&
                    ` (#${profile.intelligences.indexOf(intel.id) + 1})`}
                </Button>
              ))}
            </div>
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!results.length) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Career Matches</h2>
        <div className="space-y-4">
          {results.map((career, index) => (
            <Card key={career.title}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {index + 1}. {career.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {career.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {career.matchScore}% Match
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          onClick={() => {
            setStep(0);
            setProfile({
              mbti: '',
              hollandCode: '',
              intelligences: []
            });
            setResults([]);
          }}
        >
          Start Over
        </Button>
      </div>
    );
  };

  console.log({ step, profile, value: ((step + (profile.intelligences.length / 3)) / 3) * 100 })

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Career Fitter</CardTitle>
      </CardHeader>
      <CardContent>
        {!results.length && (
          <Progress
            value={((step + (profile.intelligences.length / 3)) / 3)}
            className="mb-6"
          />
        )}
        {results.length ? renderResults() : renderStep()}
      </CardContent>
    </Card>
  );
};

export default CareerFitter;