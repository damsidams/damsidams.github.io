import { useState, useRef } from 'react';
import { Compass, Anchor, Map, Waves, X } from 'lucide-react';

// Define TypeScript interfaces for our data structures
interface TeamMemberStats {
  complexity: number;
  innovation: number;
  impact: number;
}

interface TeamMemberDefi {
  title: string;
  description: string;
  reward: string;
  deliverable: string;
  stats: TeamMemberStats;
}

interface TeamMember {
  name: string;
  role: string;
  isTwin: boolean;
  twinWith?: string;
  specialty: string;
  coordinates: string;
  icon: JSX.Element;
  defis: TeamMemberDefi;
}

interface MousePosition {
  x: number;
  y: number;
}

const TeamCredits = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const teamMembers: TeamMember[] = [
    { 
      name: "Auguste Mulley",
      role: "Twin Developer",
      isTwin: true,
      twinWith: "Virgile Mulley",
      specialty: "Frontend Architect",
      coordinates: "48.8566° N, 2.3522° E",
      icon: <Compass className="w-6 h-6" />,
      defis: {
        title: "3DS OUTSCALE - L'île aux singes 2.0",
        description: "Création d'une fonctionnalité d'aide à l'utilisateur inspirée du jeu Monkey Island, mêlant humour et culture pop dans une interface d'assistance unique.",
        reward: "Bons cadeaux d'une valeur de 1000€ à partager",
        deliverable: "Vidéo YouTube présentant la fonctionnalité",
        stats: {
          complexity: 85,
          innovation: 92,
          impact: 88
        }
      }
    },
    { 
      name: "Virgile Mulley",
      role: "Twin Developer",
      isTwin: true,
      twinWith: "Auguste Mulley",
      specialty: "UX Navigator",
      coordinates: "48.8566° N, 2.3522° E",
      icon: <Map className="w-6 h-6" />,
      defis: {
        title: "Bad UI Challenge",
        description: "Une expérience délibérément frustrante avec des interfaces utilisateur provocantes, repoussant les limites du design web.",
        reward: "1ère place : 150€ bon FNAC, 2ème : 100€, 3ème : 50€",
        deliverable: "Page web interactive",
        stats: {
          complexity: 90,
          innovation: 95,
          impact: 85
        }
      }
    },
    { 
      name: "Eliott Duhau",
      role: "Developer",
      specialty: "Backend Captain",
      coordinates: "45.7578° N, 4.8320° E",
      icon: <Anchor className="w-6 h-6" />,
      defis: {
        title: "CAPCOD - WORST CODE EVER",
        description: "Une exploration artistique du 'mauvais code', transformant les anti-patterns en une forme d'art humoristique.",
        reward: "1000 euros en chèque cadeau à partager",
        deliverable: "Repository Git avec documentation",
        stats: {
          complexity: 88,
          innovation: 86,
          impact: 90
        }
      }
    },
    { 
      name: "Fady Assem",
      role: "Developer",
      specialty: "Security Helmsman",
      coordinates: "43.2965° N, 5.3698° E",
      icon: <Anchor className="w-6 h-6" />,
      defis: {
        title: "VIVERIS - Game Tcha",
        description: "Réinvention du CAPTCHA traditionnel en une expérience de jeu immersive et sécurisée.",
        reward: "1er prix : 1000€, 2ème : 400€, 3ème : 200€",
        deliverable: "Application web interactive",
        stats: {
          complexity: 92,
          innovation: 88,
          impact: 94
        }
      }
    }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F] relative overflow-hidden">
      
      {/* Maritime Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 255, 0.1) 0%, transparent 60%)`
        }} />
        <div className="grid grid-cols-12 h-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-500/5" />
          ))}
        </div>
      </div>

      {/* Dynamic Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <Waves className="w-full h-full text-cyan-400 animate-wave" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Notre Équipe
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-300/60">
            <Compass className="w-5 h-5" />
            <p className="text-xl tracking-wide">
              Nuit de l'Info 2024
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative"
              onClick={() => {
                setSelectedMember(member);
                setShowModal(true);
              }}
            >
              {/* Card Component */}
              <div className="p-8 rounded-xl bg-navy-800/40 border border-cyan-500/10 
                backdrop-blur-md transition-all duration-500 cursor-pointer
                hover:border-cyan-500/30 hover:bg-navy-800/60
                transform hover:-translate-y-1 hover:shadow-2xl
                hover:shadow-cyan-500/10">
                
                {/* Twin Connection Line */}
                {member.isTwin && (
                  <div className="absolute -top-4 left-0 right-0 text-center">
                    <div className="inline-block px-4 py-1 rounded-full text-sm
                      bg-cyan-500/10 text-cyan-300 backdrop-blur-md border border-cyan-500/20">
                      Twin with {member.twinWith} ⚓
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/5 
                    rounded-full blur-xl" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 
                      flex items-center justify-center border border-cyan-500/20">
                      {member.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-100">
                        {member.name}
                      </h3>
                      <p className="text-cyan-300/60 text-sm">
                        {member.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-cyan-300/40 text-sm mb-4">
                    <Map className="w-4 h-4" />
                    <span>{member.coordinates}</span>
                  </div>

                  <div className="bg-navy-900/50 rounded-lg p-4 border border-cyan-500/10">
                    <h4 className="text-cyan-200 font-medium mb-2">
                      {member.defis.title}
                    </h4>
                    <div className="flex gap-4">
                      {Object.entries(member.defis.stats).map(([key, value]) => (
                        <div key={key} className="flex-1">
                          <div className="text-cyan-300/60 text-xs mb-1 capitalize">
                            {key}
                          </div>
                          <div className="h-1 bg-cyan-500/20 rounded-full">
                            <div 
                              className="h-full bg-cyan-500 rounded-full"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-navy-900/90 backdrop-blur-md z-50 
          flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}>
          <div 
            className="max-w-3xl w-full bg-navy-800/90 rounded-xl p-8 
              border border-cyan-500/20 transform transition-all duration-300"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 
                  flex items-center justify-center border border-cyan-500/20">
                  {selectedMember.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-cyan-100">
                    {selectedMember.name}
                  </h2>
                  <p className="text-cyan-300/60">
                    {selectedMember.specialty}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-cyan-300/60 hover:text-cyan-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Challenge Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-200 mb-4">
                  {selectedMember.defis.title}
                </h3>
                <p className="text-cyan-100/80 leading-relaxed">
                  {selectedMember.defis.description}
                </p>
              </div>

              {/* Stats Visualization */}
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(selectedMember.defis.stats).map(([key, value]) => (
                  <div key={key} className="bg-navy-900/50 rounded-lg p-4 border border-cyan-500/10">
                    <div className="text-cyan-300/60 text-sm mb-2 capitalize">
                      {key}
                    </div>
                    <div className="text-2xl font-semibold text-cyan-100">
                      {value}%
                    </div>
                    <div className="h-1 bg-cyan-500/20 rounded-full mt-2">
                      <div 
                        className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reward & Deliverable */}
              <div className="bg-navy-900/50 rounded-lg p-6 border border-cyan-500/10">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-cyan-200 font-medium mb-2">Récompense</h4>
                    <p className="text-cyan-100/80">{selectedMember.defis.reward}</p>
                  </div>
                  <div>
                    <h4 className="text-cyan-200 font-medium mb-2">Livrable</h4>
                    <p className="text-cyan-100/80">{selectedMember.defis.deliverable}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(0) translateZ(0) scaleY(1); }
            50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
            100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
          }

          .animate-wave {
            animation: wave 15s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default TeamCredits;